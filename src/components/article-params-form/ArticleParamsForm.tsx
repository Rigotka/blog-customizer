import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = (
	props: ArticleStateType & { onChange: (newState: ArticleStateType) => void }
) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(props);

	const asideRef = useRef(null);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: asideRef,
		onChange: setIsOpen,
	});

	const onClickApplay = (event: React.FormEvent): void => {
		event.preventDefault();
		props.onChange(formState);
	};

	const onClickReset = () => {
		setFormState(defaultArticleState);
		props.onChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prevState) => !prevState);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={asideRef}>
				<form className={styles.form} onSubmit={onClickApplay}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected: OptionType) => {
							setFormState((prevState) => ({
								...prevState,
								fontFamilyOption: selected,
							}));
						}}
					/>
					<RadioGroup
						title={'размер шрифта'}
						name={'???'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected: OptionType) => {
							setFormState((prevState) => ({
								...prevState,
								fontSizeOption: selected,
							}));
						}}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected: OptionType) => {
							setFormState((prevState) => ({
								...prevState,
								fontColor: selected,
							}));
						}}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected: OptionType) => {
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selected,
							}));
						}}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected: OptionType) => {
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selected,
							}));
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onClickReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
